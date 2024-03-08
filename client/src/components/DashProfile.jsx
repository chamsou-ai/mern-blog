import { Button, TextInput, Textarea } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="User"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          id="email"
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput id="password" type="text" placeholder="password" />

        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
        <div className="flex justify-between mt-5">
          <span className="text-red-500">Delete</span>
          <span className="text-red-500">Sign out</span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
