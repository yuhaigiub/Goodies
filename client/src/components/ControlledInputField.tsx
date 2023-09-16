import {Box, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {useState} from "react";

const ControlledInputField: React.FC<Props> = ({name, label, value, isUpdate, type = "text", initialValue = ""}) => {
	const initialInput = value || initialValue;
	const [input, setInput] = useState(initialInput);
	const isCanceled = !isUpdate && input !== value;

	if (isCanceled) setInput(initialInput);

	return (
		<FormControl>
			<FormLabel fontWeight="bold">{label}:</FormLabel>
			<Input
				name={name}
				value={input}
				onChange={(e) => setInput(e.target.value)}
				readOnly={!isUpdate}
				type={type}
				bg="white"
				borderColor="gray.500"
				focusBorderColor="black"
			/>
			{name.length === 999 ? (
				<FormErrorMessage h="22px" textAlign="right"></FormErrorMessage>
			) : (
				<Box h="22px"></Box>
			)}
		</FormControl>
	);
};

export default ControlledInputField;

interface Props {
	name: string;
	label: string;
	value?: string | undefined;
	isUpdate: boolean;
	initialValue?: string;
	type?: string;
}
