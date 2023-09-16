import {Td, Th} from "@chakra-ui/react";

export const Tdr: React.FC<{isNumeric?: boolean; children?: React.ReactNode}> = ({isNumeric = false, children}) => {
	return (
		<Td p={{base: "12px", md: "20px"}} isNumeric={isNumeric}>
			{children}
		</Td>
	);
};

export const Thr: React.FC<{isNumeric?: boolean; children?: React.ReactNode}> = ({isNumeric = false, children}) => {
	return (
		<Th color="white" p={{base: "12px", md: "20px"}} isNumeric={isNumeric}>
			{children}
		</Th>
	);
};
