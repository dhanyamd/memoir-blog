import { Button } from "@/components/ui/button";
import {RegisterLink, LogoutLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function HomePage(){
  const {getUser} = await getKindeServerSession();
  const session = await getUser()
  return (
    <div className="p-10">
    {session ? (
      <LogoutLink>
          <Button> Logout </Button>
      </LogoutLink>
    ) : (
      <div>
      <RegisterLink>
        <Button>Register</Button>
      </RegisterLink>
      <LoginLink>
        <Button>Login</Button>
      </LoginLink>
    </div>
    )}
    </div>
  
  )
}