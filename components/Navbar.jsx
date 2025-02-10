import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <ClerkProvider>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn btn-ghost text-xl" href={"/"}>
            MyDaily
          </a>
        </div>
        <a className="btn btn-ghost" href={"/dashboard"}>
          Dashboard
        </a>
        <div className="navbar-centen lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href={"/addTopic"}>Add Topic</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  );
}
