import {
  SignUpButton,
  SignInButton,
  Protect,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown"></div>
        <a className="btn btn-ghost text-xl" href={"/"}>
          MyDaily
        </a>
      </div>
      <Protect permission="org:manage:read">
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
      </Protect>
      <div className="navbar-end">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-sm btn-outline mr-2">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-sm btn-outline "> Sign Up </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
