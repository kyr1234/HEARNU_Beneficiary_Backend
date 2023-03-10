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

    minLength: 10,
    maxLength: 10,
    required: true,
  },
  DateType: {
    type: Date,
    default: Date.now,
  },
  emailAndRequired: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },

  enumAndRequired: (list) => {
    return {
      type: String,
      enum: list,
      required: true,
    }
  },
}
