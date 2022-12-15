import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

export default function Login() {
  const { data: session, status } = useSession();

  // console.log(JSON.stringify(session, null, 5));

  if (status === "authenticated") {
    console.log(session.user.name);
    console.log(session.user.email);
  }

  if (session) {
    return;
    <div>
      Signed in as {session.user.email}
      <br />
      <Button
        content="Sign out"
        icon="signout"
        size="big"
        onClick={() => signOut()}
      />
    </div>;
  }

  return (
    <Segment placeholder>
      <Head>
        <title>Login | Next-Blog</title>
      </Head>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              placeholder="Username"
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
            />

            <Button content="Login" primary />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Button
            content="Google"
            icon="signup"
            size="big"
            onClick={() => signIn()}
          />
        </Grid.Column>
      </Grid>

      <Divider vertical>Account</Divider>
    </Segment>
  );
}
