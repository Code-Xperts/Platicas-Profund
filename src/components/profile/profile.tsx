// import React from "react";
// import Profile from "./index";

// const AdminProfile: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center ">
//       <Profile
//         imageUrl="https://via.placeholder.com/150"
//         fullName="John Doe"
//         email="john.doe@example.com"
//       />
//     </div>
//   );
// };

// export default AdminProfile;
import React from "react";
import ProfileForm from "./index";

const AdminProfile: React.FC = () => {
  return (
    <div className="">
      <ProfileForm
        imageUrl="https://via.placeholder.com/150"
        firstName="John"
        lastName="Doe"
        email="john.doe@example.com"
      />
    </div>
  );
};

export default AdminProfile;


