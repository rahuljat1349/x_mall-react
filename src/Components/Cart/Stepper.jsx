import * as React from "react";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Shipping Details", "Confirm Order", "Payment"];

export default function CheckoutStepper({ currentStep }) {
  return (
    <Stepper activeStep={currentStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconProps={{
              style: { color: index <= currentStep ? red[400] : grey[400] },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
