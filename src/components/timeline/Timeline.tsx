import { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Icon,
  Image,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSkiing } from "react-icons/fa";

import COUNTRIES from "../../data/countries";
import MEMBERS from "../../data/members";
import RESORTS from "../../data/resorts";
import TRIPS, { Trip } from "../../data/trips";

const DOT_SIZE = 64;
const DOT_SIZE_PX = `${DOT_SIZE}px`;

const MONTHS = ["Leden", "Únor", "Březen", "Duben"];

const TooltipAvatar: typeof Avatar = (props: any) => (
  <Tooltip label={props.name}>
    <Avatar
      {...props}
      borderWidth={1}
      borderColor="gray.100"
      color="white"
      bg="tertiary.300"
    />
  </Tooltip>
);

const TimelineRow = ({
  trip: { id, title, year, month, resorts, countryCode, members, nonMembers },
  i,
  handleOpen,
}: {
  trip: Trip;
  i: number;
  handleOpen: (trip: Trip) => void;
}) => {
  const even = i % 2 === 0;

  return (
    <Box key={id} py={6}>
      <Box
        pl={{ base: 24, sm: 28, md: even ? 8 : 14 }}
        pr={{ base: 4, sm: 6, md: even ? 14 : 8 }}
        pos="relative"
        left={{ base: "0%", md: even ? 0 : "50%" }}
        w={{ base: "100%", md: "50%" }}
        _after={{
          content: `"${year}"`,
          pos: "absolute",
          top: "0",
          right: even ? `-${DOT_SIZE / 2}px` : "auto",
          left: {
            base: "10px",
            sm: "20px",
            md: even ? "auto" : `-${DOT_SIZE / 2}px`,
          },
          w: DOT_SIZE_PX,
          h: DOT_SIZE_PX,
          color: "white",
          bgColor: "secondary.600",
          lineHeight: DOT_SIZE_PX,
          textAlign: "center",
          fontSize: "sm",
          fontWeight: "600",
          borderRadius: "full",
          zIndex: 1,
        }}
      >
        <Box
          py={6}
          px={8}
          color="primary.900"
          bgColor="gray.100"
          borderRadius="lg"
          borderBottom={4}
          borderStyle="solid"
          borderColor="transparent"
          boxShadow="sm"
          overflow="auto"
          _before={{
            content: '" "',
            position: "absolute",
            top: "22px",
            left: { base: "86px", sm: "102px", md: even ? "auto" : "46px" },
            right: even ? "46px" : "auto",
            h: 0,
            width: 0,
            zIndex: 1,
            borderWidth: {
              base: "10px 10px 10px 0",
              md: even ? "10px 0 10px 10px" : "10px 10px 10px 0",
            },
            borderStyle: "solid",
            borderColor: {
              base: "transparent var(--chakra-colors-gray-100) transparent transparent",
              md: even
                ? "transparent transparent transparent var(--chakra-colors-gray-100)"
                : "transparent var(--chakra-colors-gray-100) transparent transparent",
            },
          }}
          _hover={{
            cursor: "pointer",
            borderColor: "secondary.600",
          }}
          onClick={() =>
            handleOpen({
              id,
              title,
              year,
              month,
              resorts,
              countryCode,
              members,
              nonMembers,
            })
          }
        >
          {/* Month */}
          <Text fontSize="xs" color="gray.400" textTransform="uppercase">
            {MONTHS[month]}
          </Text>

          {/* Title */}
          <Heading
            as="h3"
            size="md"
            textTransform="uppercase"
            mb={2}
            display="flex"
            alignItems="center"
          >
            {title}
            <Image
              src={`/images/flags/${countryCode}.png`}
              alt={COUNTRIES[countryCode]}
              boxSize={5}
              ml={2}
            />
          </Heading>

          {/* Resorts */}
          <Flex align="center">
            <Icon as={FaSkiing} color="secondary.600" fontSize="sm" mr={3} />

            <Text fontSize="sm">
              {resorts
                .map((id) =>
                  RESORTS.filter((resort) => resort.id === id).map(
                    (resort) => resort.name
                  )
                )
                .join(", ")}
            </Text>
          </Flex>

          {/* Members */}
          <AvatarGroup
            size="sm"
            spacing={-1.5}
            mt={3}
            max={members.length}
            color="white"
            fontSize="sm"
          >
            {members.map((id) =>
              MEMBERS.filter((member) => member.id === id).map(
                ({ id, firstname, lastname }) => (
                  <TooltipAvatar key={id} name={`${firstname} ${lastname}`} />
                )
              )
            )}

            {/* Non members */}
            {nonMembers &&
              nonMembers > 0 &&
              [...Array(nonMembers)].map((_, i) => (
                <Avatar key={`nonMember-${i}`} />
              ))}
          </AvatarGroup>
        </Box>
      </Box>
    </Box>
  );
};

const Timeline = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTrip, setModalTrip] = useState<Trip>();

  const handleOpen = (trip: Trip) => {
    setModalTrip(trip);
    onOpen();
  };

  return (
    <Box>
      <Box
        pos="relative"
        maxW="container.lg"
        my={{ base: 6, sm: 8, md: 10 }}
        mx="auto"
        _after={{
          content: '""',
          pos: "absolute",
          top: 0,
          bottom: 0,
          left: { base: "42px", sm: "52px", md: "50%" },
          w: "2px",
          bgColor: "tertiary.100",
          ml: "-1px",
        }}
      >
        {TRIPS.map((trip, i) => (
          <Box key={trip.id}>
            <TimelineRow trip={trip} i={i} handleOpen={handleOpen} />
          </Box>
        ))}
      </Box>

      <Heading
        my={8}
        mx={6}
        as="h4"
        fontSize="2xl"
        textAlign={{ md: "center" }}
        color="primary.800"
      >
        Kam příště?
      </Heading>

      {modalTrip && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="full"
          variant="almostFull"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display="flex">
              <Badge
                color="white"
                bgColor="secondary.600"
                fontSize="lg"
                display="flex"
                alignItems="center"
                px={2}
                borderRadius="md"
              >
                {modalTrip.year}
              </Badge>
              <Text
                ml={1.5}
                color="gray.600"
                textTransform="uppercase"
                fontWeight="400"
              >
                {MONTHS[modalTrip.month]}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody py={0}>
              <Heading
                display="flex"
                alignItems="center"
                textTransform="uppercase"
              >
                {modalTrip.title}
                <Image
                  src={`/images/flags/${modalTrip.countryCode}.png`}
                  alt={COUNTRIES[modalTrip.countryCode]}
                  boxSize={8}
                  ml={3}
                />
              </Heading>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Timeline;
