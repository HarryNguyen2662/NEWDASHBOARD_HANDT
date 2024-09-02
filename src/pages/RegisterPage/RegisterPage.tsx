import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { Formik, FormikHelpers } from "formik";
import { NextStepButton, PrevStepButton } from "./Nav";
import { STEPS } from "./constants";
import { getInitValues } from "../../utils/form";
import { registerSchema } from "./schema";
import { FormValues } from "@/types/RegisterPage";
import { registerUser } from "../../services/register";
import { useToast } from "@chakra-ui/react";

const RegisterPage: React.FC = () => {
  const toast = useToast({
    position: "bottom-right",
  });

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  useEffect(() => {
    const originalBackground = document.body.style.background;
    document.body.style.background =
      "linear-gradient(90deg, #0f2240, #36088e, #280f6d, #211053, #111f44)";
    document.body.style.backgroundSize = "100% 100%";

    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);

  const navigate = useNavigate();

  const handleRegister = async (
    formValues: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      state,
      country,
      linkedIn,
      twitter,
      ...rest
    } = formValues;
    console.log(formValues);
    console.log("answers", rest);

    try {
      await registerUser(formValues, toast);
      navigate("/register-success");
    } catch (e) {
      console.log("RES ERR:", e);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const initialValues: FormValues = getInitValues(STEPS);
  const [curStep, setCurStep] = useState(0);

  const renderStep = (form: any) => {
    const step = STEPS[curStep];
    const StepComponent = step.component;
    return <StepComponent {...form} />;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          validateOnChange={false}
          onSubmit={handleRegister}
        >
          {(form) => {
            return (
              <>
                <div className={styles.formHeader}>
                  <PrevStepButton
                    steps={STEPS}
                    curStepId={curStep}
                    handlePrevStep={() => setCurStep(curStep - 1)}
                    handleFirstStep={() =>
                      navigate("../login", { relative: "path" })
                    }
                  />
                  <div className={styles.stepIndicator}>
                    <span>
                      STEP 0{curStep + 1}/0{STEPS.length}
                    </span>
                    <span className={styles.stepLabel}>
                      {STEPS[curStep].name}
                    </span>
                  </div>
                </div>
                <div className={styles.formContent}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <h2 className={styles.stepTitle}>{STEPS[curStep].title}</h2>
                    <span className={styles.stepSubtitle}>
                      * All fields required unless noted.
                    </span>
                  </div>
                  {renderStep(form)}
                </div>
                <div className={styles.formFooter}>
                  <NextStepButton
                    steps={STEPS}
                    curStepId={curStep}
                    handleNextStep={() => {
                      console.log("cur:", curStep, "err:", form.errors);
                      setCurStep(curStep + 1);
                    }}
                  />
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
