import tw, { styled } from "twin.macro";
export const ConditionalButton = styled.button(({ isRed }) => [
	isRed ? tw`bg-red-500 hover:bg-red-700` : tw`bg-blue-500 hover:bg-blue-500`,
]);
