// TODO: Implement a reusable API response handler for all endpoints
import axios from "axios";

type LoginProps = {
  username: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  message: string;
};

export const LogInApi = async (props: LoginProps): Promise<LoginResponse> => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const url = `${API_URL}/api/v1/auth/login`;
  const formBody = new URLSearchParams({
    username: props.username,
    password: props.password,
  });

  try {
    const response = await axios.post(url, formBody.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return {
      success: true,
      data: response.data,
      message: "Login successful",
    };
  } catch (error) {
    throw error;
  }
};
