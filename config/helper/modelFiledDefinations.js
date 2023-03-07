export default {
  stringOnly: {
    type: String,
    default: '',
  },
  stringAndRequired: {
    type: String,
    required: true,
  },
  stringAndUnique: {
    type: String,
    required: true,
    unique: true,
  },
  numberOnly: {
    type: Number,
  },
  numberAndRequired: {
    type: Number,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  numberAndRequiredAndUnique: {
    type: Number,
    unique: true,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  DateType: {
    type: Date,
    default: Date.now,
  },
  enumAndRequired: (list) => {
    return {
      type: String,
      enum: list,
      required: true,
    }
  },
  booleanAndRequired: (defaultVal = 0) => {
    return {
      type: Boolean,
      required: true,
      default: defaultVal,
    }
  },
  boolean: (defaultVal = 0) => {
    return {
      type: Boolean,
      default: defaultVal,
    }
  },
}
