import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log(session.user.name);
    console.log(session.user.email);
  }

  if (status === "authenticated") {
    return (
      <Segment placeholder>
        <h3>E-mail&emsp;:&emsp;{session.user.email}</h3>
        <h1>Login Complete</h1>
      </Segment>
    );
  } else {
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
}
