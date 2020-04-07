import styled from "styled-components";

export const AuthPageContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	font-family: sans-serif;
	font-size: 16px;

	.formWrapper {
		max-width: 600px;
		margin: 30px auto;
		padding: 20px;
		border: 1px solid #DFE1E5;
		border-radius: 4px;
		box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
	}

	.inputWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;

		label {
			margin: 5px 0;
		}

		input {
			width: 50%;
			font-size: 16px;
			padding: 5px 15px;
			border: 1px solid #ababab;
			border-radius: 3px;
		}
	}

	button {
		display: block;
		margin: 20px auto 0;
		font-size: 16px;
		padding: 10px 30px;
		border: 1px solid #ababab;
		border-radius: 3px;
		background-color: white;
		transition: linear 200ms;

		&:hover {
			box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
		}
	}
`;