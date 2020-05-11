const structure = {
    worksheetname: 'STOCK',
    mandatoryColumns: ['QUANTITY', 'TYPE'],
    columns: {
      QUANTITY: {
        name: 'QUANTITY',
        validate(value){
          value = parseInt(value)
          if (!Number.isInteger(value)){
              return 'Columns ' + this.name + ' must be a integer'
          }
        }
      },
      TYPE: {
        name: 'TYPE',
        validate(value){
            aceptedValues = ['BEVERAGE', 'FOOD', 'CLEANING PRODUCT']
            if (!aceptedValues.find(element => element == value)) {
                throw 'Columns ' + this.name + ' must be one of ' + aceptedValues
            }
        }
      },
    }
  }

  module.exports = {
    structure
  }