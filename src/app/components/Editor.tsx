"use client";

import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Box, Button, Textarea, useBoolean, useToast } from "@chakra-ui/react";

import { AnyTable, AnyEmptyTable } from "@/app/utils/types";

const strigify = (data: AnyEmptyTable) => JSON.stringify(data, null, 4);

const Editor = ({
  data,
  setData,
}: {
  data: AnyTable | AnyEmptyTable;
  setData:
    | Dispatch<SetStateAction<AnyTable>>
    | Dispatch<SetStateAction<AnyEmptyTable>>;
}) => {
  const toast = useToast();

  const [value, setValue] = useState(strigify(data));
  const [isInvalid, setIsInvalid] = useBoolean(false);

  const parseJson = useCallback(() => {
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
  }, [value, setIsInvalid, toast]);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setIsInvalid.off();
    setValue(e.currentTarget.value);
  };

  const handleBeautify = () => {
    const parsed = parseJson();
    if (!parsed) return;
    setValue(strigify(parsed));
  };

  useEffect(() => {
    const parsed = parseJson();
    if (!parsed) return;
    setData(parsed);
  }, [value, parseJson, setData]);

  return (
    <Box position="relative">
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
      <Button
        position="absolute"
        top={1}
        right={1}
        variant="ghost"
        size="xs"
        height={7}
        px={3}
        fontWeight={500}
        textTransform="uppercase"
        borderRadius={6}
        onClick={handleBeautify}
      >
        Beautify
      </Button>
    </Box>
  );
};

export default Editor;
