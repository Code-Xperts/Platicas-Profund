import React, { useState, ChangeEvent } from "react";
import { FormInput } from "../Base/Form";
import Button from "../Base/Button";

export type ProfileFormProps = {
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  imageUrl,
  firstName,
  lastName,
  email,
}) => {
  const [img, setImg] = useState(imageUrl);
  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImg(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Saved:", { firstName: fName, lastName: lName, email, img });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 shadow-md rounded-xl p-10 border border-gray-300">
      <p className="text-gray-700 text-2xl font-semibold text-center mb-6">
        Profile
      </p>
      {/* Profile image */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={img}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600">
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            ✏️
          </label>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-6 space-y-4">
        {/* First Name + Last Name in one row */}
        <div className="flex gap-4">
          <FormInput
            placeholder="First Name"
            type="text"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FormInput
            placeholder="Last Name"
            type="text"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email + Save button in one row */}
        <div className="flex gap-4">
          <FormInput
            placeholder="Email"
            type="email"
            value={email}
            disabled
            className="flex-1 border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex justify-end">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
