"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Textarea,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  HiOutlineArrowLongLeft,
  HiOutlineCheck,
  HiOutlineCloudArrowDown,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";

import { updateRow, deleteRow } from "@/app/utils/database";
import { TableName, AnyTable } from "@/app/utils/types";

const strigify = (data: AnyTable) => JSON.stringify(data, null, 4);

const ConfirmRemove = ({
  id,
  isOpen,
  isRemoving,
  onClose,
  onRemove,
}: {
  id: string;
  isOpen: boolean;
  isRemoving: boolean;
  onClose: () => void;
  onRemove: () => void;
}) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remove &quot;{id}&quot;
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup spacing={2}>
              <Button
                ref={cancelRef}
                leftIcon={<HiOutlineXMark />}
                isDisabled={isRemoving}
                onClick={onClose}
              >
                Dismiss
              </Button>
              <Button
                colorScheme="red"
                leftIcon={<HiOutlineCheck />}
                isDisabled={isRemoving}
                isLoading={isRemoving}
                onClick={onRemove}
              >
                Remove
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const View = ({
  table,
  id,
  data,
}: {
  table: TableName;
  id: string;
  data: AnyTable;
}) => {
  const router = useRouter();
  const toast = useToast();

  const [value, setValue] = useState(strigify(data));
  const [isInvalid, setIsInvalid] = useBoolean(false);
  const [isSaving, setIsSaving] = useBoolean(false);
  const [isRemoving, setIsRemoving] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parseJson = () => {
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch (e) {
      setIsInvalid.on();
      toast({
        status: "error",
        title: "Invalid JSON",
        description: "Please enter a valid JSON",
      });
    }
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setIsInvalid.off();
    setValue(e.currentTarget.value);
  };

  const handleBeautify = () => {
    const parsed = parseJson();
    if (!parsed) return;
    setValue(strigify(parsed));
  };

  const handleSave = () => {
    const parsed = parseJson();
    if (!parsed) return;
    setIsSaving.on();

    updateRow(table, id, parsed)
      .then((result) => {
        toast({
          status: "success",
          title: "Success",
          description: `Successfully updated ${table} with id ${id}`,
        });

        if (result.id !== id) {
          router.push(`/admin/${table}/${result.id}`);
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          status: "error",
          title: "Error occurred",
          description: `Updating ${table} with id ${id} failed.`,
        });
      })
      .finally(() => {
        setIsSaving.off();
      });
  };

  const handleRemove = () => {
    setIsRemoving.on();

    deleteRow(table, id)
      .then(() => {
        toast({
          status: "success",
          title: "Removed",
          description: `Successfully removed ${table} with id ${id}`,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          status: "error",
          title: "Error occurred",
          description: `Removing ${table} with id ${id} failed.`,
        });
      })
      .finally(() => {
        setIsRemoving.off();
        onClose();
        router.push(`/admin/${table}`);
      });
  };

  return (
    <>
      <Box position="relative">
        <Button
          position="absolute"
          top={1}
          right={1}
          size="xs"
          height={7}
          px={3}
          fontWeight={500}
          textTransform="uppercase"
          borderRadius={6}
          zIndex={10}
          onClick={handleBeautify}
        >
          Beautify
        </Button>
        <Textarea
          value={value}
          placeholder="JSON data"
          isInvalid={isInvalid}
          variant="filled"
          resize="vertical"
          rows={20}
          p={8}
          letterSpacing="0.02rem"
          borderRadius={8}
          onChange={handleChange}
        />
      </Box>

      <Divider my={{ base: 4, sm: 6 }} />

      {/* Footer */}
      <Stack direction={{ base: "column", sm: "row" }} justify="space-between">
        {/* Cancel */}
        <Button
          as={Link}
          href={`/admin/${table}`}
          variant="outline"
          size="lg"
          leftIcon={<HiOutlineArrowLongLeft />}
          isDisabled={isSaving}
        >
          Cancel
        </Button>

        <Stack direction={{ base: "column", sm: "row" }}>
          {/* Remove */}
          <Button
            colorScheme="red"
            size="lg"
            leftIcon={<HiOutlineTrash />}
            isDisabled={isSaving}
            onClick={onOpen}
          >
            Remove
          </Button>
          {/* Save */}
          <Button
            colorScheme="secondary"
            size="lg"
            leftIcon={<HiOutlineCloudArrowDown />}
            isLoading={isSaving}
            isDisabled={isSaving}
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </Stack>

      {/* Remove confirmation */}
      <ConfirmRemove
        id={id}
        isOpen={isOpen}
        isRemoving={isRemoving}
        onClose={onClose}
        onRemove={handleRemove}
      />
    </>
  );
};

export default View;
