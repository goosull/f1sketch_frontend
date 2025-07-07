"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  HStack,
  Toast,
  createToaster,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }} bg="box" color="text">
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <HStack gap="2" flex="1" maxWidth="100%">
              <HStack
                color={
                  toast.type === "ok"
                    ? "green.solid"
                    : toast.type === "not-ok"
                    ? "themeRed"
                    : "text"
                }
              >
                {toast.type === "ok" && <FaCheck />}
                {toast.type === "not-ok" && <MdOutlineErrorOutline />}
              </HStack>

              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </HStack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
