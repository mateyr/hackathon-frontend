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
    first_name: string;
    last_name: string;
  };
  message: string;
};

export const LogInApi = async (props: LoginProps): Promise<LoginResponse> => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";
  const url = `${baseUrl}/api/v1/login`;
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
      data: {
        ...response.data,
        first_name: response.data.first_name,
        last_name: response.data.last_name
      },
      message: "Login successful",
    };
  } catch (error) {
    throw error;
  }
};
