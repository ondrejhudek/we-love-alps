"use client";

import { useRouter } from "next/navigation";
import {
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { MdSnowboarding, MdDownhillSkiing } from "react-icons/md";

import Container from "@/app/components/Container";
import { Activity, Member } from "@/app/utils/types";
import { AvatarImage } from "@/app/components/Image";

const TYPE_ICONS = {
  ski: MdDownhillSkiing,
  snowboard: MdSnowboarding,
};

const ActivitiesComponent = ({
  data,
  members,
}: {
  data: Activity[];
  members: Member[];
}) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/member/${id}`);
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
              }) => {
                const member = members.find((m) => m.id === member_id);

                return (
                  <Tr key={`${trip_id}-${id}`}>
                    <Td width="50px">
                      <Icon as={TYPE_ICONS[type]} fontSize="lg" />
                    </Td>
                    <Td>
                      {member && (
                        <AvatarImage
                          id={member.id}
                          name={member.name}
                          boxSize={8}
                          _hover={{
                            cursor: "pointer",
                            boxShadow: "outline",
                          }}
                          onClick={() => handleClick(member.id)}
                        />
                      )}
                    </Td>
                    <Td>{date.toLocaleDateString()}</Td>
                    <Td>{distance_km} km</Td>
                    <Td>{runs}</Td>
                    <Td>{max_speed_km_h && `${max_speed_km_h} km/h`}</Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ActivitiesComponent;
