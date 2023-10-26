
class Boleto {
    constructor({
      amount,
      name,
      taxId,
      streetLine1,
      streetLine2,
      district,
      city,
      stateCode,
      zipCode,
      due,
      fine,
      interest,
    }) {
      this.amount = amount;
      this.name = name;
      this.taxId = taxId;
      this.streetLine1 = streetLine1;
      this.streetLine2 = streetLine2;
      this.district = district;
      this.city = city;
      this.stateCode = stateCode;
      this.zipCode = zipCode;
      this.due = due;
      this.fine = fine;
      this.interest = interest;
    }
  }
  
  module.exports = Boleto;
  