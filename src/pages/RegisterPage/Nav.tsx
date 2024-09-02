import React, { useCallback, useMemo } from "react";
import { useFormikContext, FormikErrors } from "formik";
import { Button, SimpleGrid } from "@chakra-ui/react";
import { containErrorInFields } from "../../utils/form";
import { IoChevronBackOutline } from "react-icons/io5";
import styles from "./RegisterPage.module.css";
import { FormStep, FormValues } from "@/types/RegisterPage";

// Define the props for the NextStepButton component
interface NextStepButtonProps {
  steps: FormStep[];
  curStepId: number;
  handleNextStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NextStepButton: React.FC<NextStepButtonProps> = ({
  steps,
  curStepId,
  handleNextStep,
}) => {
  const { handleSubmit, errors, setTouched } = useFormikContext<FormValues>();

  const isLastStep = curStepId === steps.length - 1;
  const stepHasError = containErrorInFields(
    errors,
    Object.keys(steps[curStepId].schema)
  );

  const validateStep = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const fields = Object.keys(steps[curStepId].schema).map((key) => [
        key,
        true,
      ]);
      const res = await setTouched(Object.fromEntries(fields));
      if (
        !containErrorInFields(
          res as FormikErrors<FormValues>,
          Object.keys(steps[curStepId].schema)
        )
      ) {
        handleNextStep(e);
      }
    },
    [steps, curStepId, handleNextStep, setTouched]
  );

  const handleClick = useMemo(() => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLastStep) {
        handleSubmit(); // Call handleSubmit without passing the event
      } else {
        validateStep(e);
      }
    };
  }, [isLastStep, handleSubmit, validateStep]);

  return (
    <SimpleGrid width="100%" columns={1}>
      <Button
        isDisabled={stepHasError}
        // colorScheme="primary"
        bg="#ffa300"
        color="black"
        onClick={handleClick}
        size="lg"
      >
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </SimpleGrid>
  );
};

// Define the props for the PrevStepButton component
interface PrevStepButtonProps {
  steps: FormStep[];
  curStepId: number;
  handlePrevStep: () => void;
  handleFirstStep: () => void;
}

export const PrevStepButton: React.FC<PrevStepButtonProps> = ({
  curStepId,
  handlePrevStep,
  handleFirstStep,
}) => {
  const isFirstStep = curStepId === 0;

  const handleClick = useMemo(
    () => (isFirstStep ? handleFirstStep : handlePrevStep),
    [handleFirstStep, handlePrevStep, isFirstStep]
  );

  return (
    <div>
      <button
        className={styles.prevStepBtn}
        type="button"
        onClick={handleClick}
      >
        <IoChevronBackOutline />
        {isFirstStep ? "Back to Login" : "Back"}
      </button>
    </div>
  );
};
