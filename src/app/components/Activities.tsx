"use client";

import { useState } from "react";
import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MdSnowboarding, MdDownhillSkiing } from "react-icons/md";

import Container from "@/app/components/Container";
import { Activity, Member } from "@/app/utils/types";
import { AvatarImage } from "@/app/components/Image";

const TYPE_ICONS = {
  ski: MdDownhillSkiing,
  snowboard: MdSnowboarding,
};

const GarminEmbed = ({
  id,
  isOpen,
  onClose,
}: {
  id?: Activity["garmin_id"];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detail aktivity</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Skeleton isLoaded={isLoaded} borderRadius={16} overflow="hidden">
            <iframe
              src={`https://connect.garmin.com/modern/activity/embed/${id}`}
              title="Garmin aktivita"
              width="464"
              height="500"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
            />
          </Skeleton>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Zavřít
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ActivitiesComponent = ({
  data,
  members,
}: {
  data: Activity[];
  members: Member[];
}) => {
  const hoverBgColor = useColorModeValue("gray.100", "gray.900");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeGarminId, setActiveGarminId] = useState<Activity["garmin_id"]>();

  const hadnleClick = (id: Activity["garmin_id"]) => {
    setActiveGarminId(id);
    onOpen();
  };

  return (
    <Container
      title="Měřené aktivity"
      bodyProps={{ pt: 0, px: 0 }}
      count={data.length}
    >
      <TableContainer mt={4} mx={4}>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Člen</Th>
              <Th>Datum</Th>
              <Th>Vzdálenost</Th>
              <Th>Počet sjezdů</Th>
              <Th>Max. rychlost</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(
              ({
                id,
                trip_id,
                type,
                member_id,
                distance_km,
                runs,
                max_speed_km_h,
                date,
                garmin_id,
              }) => {
                const member = members.find((m) => m.id === member_id);

                return (
                  <Tr
                    key={`${trip_id}-${id}`}
                    role="group"
                    _hover={{
                      cursor: "pointer",
                    }}
                    onClick={() => hadnleClick(garmin_id)}
                  >
                    <Td
                      width="50px"
                      _groupHover={{
                        bgColor: hoverBgColor,
                      }}
                    >
                      <Icon as={TYPE_ICONS[type]} fontSize="lg" />
                    </Td>
                    <Td
                      _groupHover={{
                        bgColor: hoverBgColor,
                      }}
                    >
                      {member && (
                        <AvatarImage
                          id={member.id}
                          name={member.name}
                          boxSize={8}
                        />
                      )}
                    </Td>
                    <Td
                      _groupHover={{
                        bgColor: hoverBgColor,
                      }}
                    >
                      {date.toLocaleDateString()}
                    </Td>
                    <Td
                      _groupHover={{
                        bgColor: hoverBgColor,
                      }}
                    >
                      {distance_km} km
                    </Td>
                    <Td
                      _groupHover={{
                        bgColor: hoverBgColor,
                      }}
                    >
                      {runs}
                    </Td>
                    <Td
                      _groupHover={{
                        bgColor: hoverBgColor,
                      }}
                    >
                      {max_speed_km_h} km/h
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <GarminEmbed id={activeGarminId} isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default ActivitiesComponent;
