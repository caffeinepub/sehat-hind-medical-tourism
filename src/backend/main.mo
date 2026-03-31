import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Int "mo:core/Int";

actor {
  type Inquiry = {
    name : Text;
    country : Text;
    phone : Text;
    medicalIssue : Text;
    age : Text;
    timestamp : Int;
  };

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let inquiries = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, country : Text, phone : Text, medicalIssue : Text, age : Text, timestamp : Int) : async () {
    let inquiry : Inquiry = {
      name;
      country;
      phone;
      medicalIssue;
      age;
      timestamp;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    inquiries.toArray().sort();
  };
};
