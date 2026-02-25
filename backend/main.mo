import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  public type CustomerProfile = {
    principal : Principal;
    displayName : Text;
    email : ?Text;
    registrationTimestamp : Time.Time;
  };

  public type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
  };

  public type Booking = {
    id : Nat;
    customer : Principal;
    serviceName : Text;
    date : Text;
    status : BookingStatus;
    timestamp : Time.Time;
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let customerProfiles = Map.empty<Principal, CustomerProfile>();
  let bookings = List.empty<Booking>();
  var bookingCounter = 0;

  module BookingUtils {
    public func compareByDate(b1 : Booking, b2 : Booking) : Order.Order {
      Text.compare(b1.date, b2.date);
    };
  };

  // Required profile functions for frontend compatibility

  public query ({ caller }) func getCallerUserProfile() : async ?CustomerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    customerProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : CustomerProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    customerProfiles.add(caller, { profile with principal = caller });
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?CustomerProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    customerProfiles.get(user);
  };

  // Customer Profile Management

  public shared ({ caller }) func registerCustomer(displayName : Text, email : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register");
    };

    if (customerProfiles.containsKey(caller)) {
      Runtime.trap("Customer already registered");
    };

    let profile : CustomerProfile = {
      principal = caller;
      displayName;
      email;
      registrationTimestamp = Time.now();
    };

    customerProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCustomerProfile() : async ?CustomerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    customerProfiles.get(caller);
  };

  // Booking Management

  public shared ({ caller }) func createBooking(serviceName : Text, date : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create bookings");
    };

    if (not customerProfiles.containsKey(caller)) {
      Runtime.trap("Customer not registered");
    };

    let booking : Booking = {
      id = bookingCounter;
      customer = caller;
      serviceName;
      date;
      status = #pending;
      timestamp = Time.now();
    };

    bookings.add(booking);
    bookingCounter += 1;
    booking.id;
  };

  public query ({ caller }) func getCustomerBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their bookings");
    };
    bookings.filter(func(b) { b.customer == caller }).toArray().sort(BookingUtils.compareByDate);
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, newStatus : BookingStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update bookings");
    };

    let bookingsArray = bookings.toArray();
    var found = false;

    let updatedBookings = bookingsArray.map(
      func(b) {
        if (b.id == bookingId and b.customer == caller) {
          found := true;
          { b with status = newStatus };
        } else {
          b;
        };
      }
    );

    if (not found) {
      Runtime.trap("Booking not found or unauthorized");
    };

    bookings.clear();
    bookings.addAll(updatedBookings.values());
  };
};
