"use client";

import {
  Box,
  Card,
  CardBody,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Text,
  ToastProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";

type Status = "info" | "warning" | "success" | "error";

const ICONS: Record<Status, IconType> = {
  info: HiOutlineInformationCircle,
  warning: HiOutlineExclamationTriangle,
  success: HiOutlineCheckCircle,
  error: HiOutlineXCircle,
};

const COLORS: Record<Status, string> = {
  info: "blue",
  warning: "yellow",
  success: "green",
  error: "red",
};

const Toast = ({ status, title, description, onClose }: ToastProps) => {
  const textColor = useColorModeValue("gray.500", "gray.400");
  const iconColor = useColorModeValue(
    `${COLORS[status as Status]}.500`,
    `${COLORS[status as Status]}.300`
  );

  return (
    <Card>
      <CardBody>
        <Flex justify="space-between">
          <Flex>
            {/* Icon */}
            {status && (
              <Icon
                as={ICONS[status as Status]}
                color={iconColor}
                boxSize={6}
                mr={3}
              />
            )}

            {/* Title, Description */}
            <Box>
              {title && <Heading fontSize="md">{title}</Heading>}
              {description && (
                <Text color={textColor} fontSize="sm">
                  {description}
                </Text>
              )}
            </Box>
          </Flex>

          {/* Close button */}
          <CloseButton
            colorScheme="gray"
            variant="ghost"
            size="sm"
            ml={5}
            onClick={onClose}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Toast;
