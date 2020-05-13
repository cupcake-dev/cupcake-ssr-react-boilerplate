import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useCallback,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { withReduxDynamicModules } from '@cupcake/webcore';
import {
  signInSelectors,
  signInActions,
  SignInStatusEnum,
} from '@cupcake/auth.module';
import {
  PageContainer,
  Form,
  InputContainer,
  Label,
  InputText,
  Button,
} from '../components/ui';
import { isEmail, isNotEmpty } from '../helpers/validators';
import Layout from '../components/layout/Layout';

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const [isPending, setIsPending] = useState(false);

  const status = useSelector(signInSelectors.selectSignInStatus);
  const email: string = useSelector(signInSelectors.selectEmail);
  const password: string = useSelector(signInSelectors.selectPassword);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignInSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPending(true);
      if (isEmail(email) && isNotEmpty(password)) {
        dispatch(signInActions.SignIn());
      } else {
        alert('Please check if your email or password is spelled correctly');
        setIsPending(false);
      }
    },
    [email, password],
  );

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(signInActions.ChangeEmail(e.target.value));
  }, []);
  const handlePaswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(signInActions.ChangePassword(e.target.value));
    },
    [],
  );

  useEffect(() => {
    if (status === SignInStatusEnum.SUCCESS) {
      setIsPending(false);
      dispatch(signInActions.SignInFormReset());
      router.replace('/');
    } else if (status === SignInStatusEnum.FAIL) {
      setIsPending(false);
      alert('Something goes wrong');
    }
  }, [status]);

  return (
    <Layout>
      <PageContainer>
        <Form onSubmit={handleSignInSubmit}>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <InputText
              value={email}
              onChange={handleEmailChange}
              disabled={isPending}
              type="text"
              id="email"
              placeholder="Your email"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">Password</Label>
            <InputText
              value={password}
              onChange={handlePaswordChange}
              disabled={isPending}
              type="password"
              id="password"
              placeholder="Your password"
            />
          </InputContainer>
          <Button type="submit" disabled={isPending}>
            Sign In
          </Button>
        </Form>
      </PageContainer>
    </Layout>
  );
};

export default withReduxDynamicModules(SignIn, []);
