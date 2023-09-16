import {Input, FormLabel, FormControl, FormErrorMessage, Box} from "@chakra-ui/react";

const InputField: React.FC<Props> = ({
	name,
	label,
	type = "text",
	placeholder = "",
	isInvalid = false,
	isRequired = false,
	errorMessage = "Error Message",
}) => {
	return (
		<FormControl isInvalid={isInvalid} isRequired={isRequired}>
			<FormLabel fontWeight="bold">{label}:</FormLabel>
			<Input
				placeholder={placeholder || ""}
				name={name}
				type={type}
				borderColor="gray.500"
				focusBorderColor="black"
				bg="white"
			/>
			{isInvalid ? (
				<FormErrorMessage justifyContent="flex-end" h="20px" mt="4px">
					{errorMessage}
				</FormErrorMessage>
			) : (
				<Box h="20px" mt="4px"></Box>
			)}
		</FormControl>
	);
};

export default InputField;

interface Props {
    name: string;
	label: string;
	type?: string;
	placeholder?: string;
    isRequired?: boolean;
	isInvalid?: boolean;
	errorMessage?: string;
}
