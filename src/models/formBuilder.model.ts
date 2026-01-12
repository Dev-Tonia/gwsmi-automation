import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema(
  {
    value: {
      type: String,
      required: [true, "Option value is required"],
      trim: true,
    },
  },
  { _id: false }
);

const FormFieldSchema = new Schema(
  {
    key: {
      type: String,
      required: [true, "Field key is required"],
      trim: true,
    },

    label: {
      type: String,
      required: [true, "Field label is required"],
      trim: true,
    },

    type: {
      type: String,
      required: [true, "Field type is required"],
      enum: {
        values: [
          "short_text",
          "long_text",
          "email",
          "phone",
          "checkbox",
          "select",
          "multi_select", // ⚠ fixed typo (space → underscore)
        ],
        message: "Invalid field type",
      },
    },

    required: {
      type: Boolean,
      default: false,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      required: [true, "Field order is required"],
    },

    options: {
      type: [OptionSchema],
      default: null,
      validate: {
        validator: function (this: any, value: any[] | null) {
          if (["select", "multi_select"].includes(this.type)) {
            return Array.isArray(value) && value.length > 0;
          }
          return value === null;
        },
        message:
          "Options are required for select and multi-select fields and must be null for other field types",
      },
    },
  },
  { _id: false }
);

const FormBuilderSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      unique: true,
    },

    fields: {
      type: [FormFieldSchema],
      default: [],
    },

    consentText: {
      type: String,
      required: [true, "Consent text is required"],
    },
  },
  { timestamps: true }
);

export const FormBuilder = mongoose.model("FormBuilder", FormBuilderSchema);
