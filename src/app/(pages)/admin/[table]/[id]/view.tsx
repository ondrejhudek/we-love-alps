"use client";

import { useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
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

import Breadcrump from "@/app/components/admin/Breadcrumb";
import Editor from "@/app/components/Editor";
import { updateRow, deleteRow } from "@/app/utils/database";
import { TableName, AnyTable } from "@/app/utils/types";

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

  const [value, setValue] = useState(data);
  const [isSaving, setIsSaving] = useBoolean(false);
  const [isRemoving, setIsRemoving] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const labelColor = useColorModeValue("gray.500", "gray.400");

  const handleSave = () => {
    setIsSaving.on();

    updateRow(table, id, value)
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
      .catch(() => {
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
      .catch(() => {
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
      {/* Header */}
      <Breadcrump table={table} id={id} />
      <Heading as="h2" fontSize="2xl">
        <Text as="span" mr={1.5} color={labelColor} fontWeight={300}>
          table:
        </Text>
        {table}
        <Text as="span" mr={1.5} color={labelColor} fontWeight={300}>
          , id:
        </Text>
        {id}
      </Heading>

      <Divider my={4} />

      <Editor data={value} setData={setValue} />

      <Divider my={{ base: 4, sm: 6 }} />

      {/* Footer */}
      <Stack direction={{ base: "column", sm: "row" }} justify="space-between">
        {/* Cancel */}
        <Button
          as={NextLink}
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
            variant="outline"
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
