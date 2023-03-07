"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaInstagram, FaFacebook } from "react-icons/fa";

import Alert from "@/app/components/Alert";
import Header from "@/app/components/Header";
import { AvatarImage, FlagImage, ResortImage } from "@/app/components/Image";

import MEMBERS, { MemberProps } from "@/data/members";
import RESORTS, { ResortProps } from "@/data/resorts";
import TRIPS from "@/data/trips";

const PersonalInfo = ({
  id,
  label,
  color,
}: {
  id: string;
  label: string;
  color: string;
}) => {
  const member = MEMBERS.find((member) => member.id === id);
  if (!member) return null;

  return (
    <Flex
      justify={{ base: "center", sm: "flex-start" }}
      align="center"
      fontSize="sm"
    >
      <Text color="gray.500">{label} /</Text>
      <Link
        as={NextLink}
        href={`/members/${member.id}`}
        ml={1.5}
        color={color}
        fontWeight={600}
        onClick={(e) => e.stopPropagation()}
      >
        @{member.nickname || member.id}
      </Link>
    </Flex>
  );
};

const Interest = ({ children }: { children: React.ReactNode }) => {
  const color = useColorModeValue("gray.700", "gray.300");
  const colorHover = useColorModeValue("gray.800", "gray.200");
  const bgColorHover = useColorModeValue("gray.200", "gray.500");

  return (
    <Badge
      py={0.5}
      px={1.5}
      color={color}
      _hover={{
        color: colorHover,
        bgColor: bgColorHover,
      }}
    >
      {children}
    </Badge>
  );
};

const SocialButton = ({
  network,
  icon,
  link,
}: {
  network: "facebook" | "instagram";
  icon: IconType;
  link: string;
}) => (
  <IconButton
    as={Link}
    href={link}
    target="_blank"
    icon={<Icon as={icon} boxSize={5} />}
    size="lg"
    bgColor={`${network}.500`}
    color="white"
    rounded="full"
    aria-label={network}
    _hover={{
      bgColor: `${network}.400`,
    }}
  />
);

const Count = ({ number }: { number: number }) => (
  <Center
    boxSize={6}
    ml={2}
    rounded="full"
    color="white"
    bgColor="secondary.600"
    fontSize="xs"
    fontWeight={500}
  >
    {number}
  </Center>
);

const Member = ({ data }: { data?: MemberProps }) => {
  const router = useRouter();

  const nicknameColor = useColorModeValue("gray.700", "gray.300");
  const tripBgColor = useColorModeValue("gray.50", "gray.800");
  const dividerColor = useColorModeValue("gray.300", "gray.800");

  if (!data)
    return (
      <Alert
        title="Tento zájezd neexistuje."
        description="Běž zpět a vyber jiný."
        button={{
          path: "/trips",
          label: "Zpět na Zájezdy",
        }}
      />
    );

  const trips = TRIPS.filter((trip) => trip.members.includes(data.id)).sort(
    (a, b) => b.year - a.year
  );

  const resorts = trips
    .flatMap(({ resorts }) => resorts)
    .reduce<ResortProps[]>((acc, resortId) => {
      const found = RESORTS.find(({ id }) => id === resortId);
      const exists = acc.find(({ id }) => id === resortId);
      if (found && !exists) acc.push(found);
      return acc;
    }, [])
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

  const handleTripClick = (id: string) => {
    router.push(`/trips/${id}`);
  };

  const handleResortClick = (id: string) => {
    router.push(`/resorts/${id}`);
  };

  return (
    <>
      {/* Basic information */}
      <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
        <CardBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              align={{ base: "center", sm: "flex-start" }}
            >
              <Box boxSize={36} mr={{ base: 0, sm: 6 }}>
                <AvatarImage id={data.id} name={data.name} boxSize="full" />
              </Box>

              <Box
                textAlign={{ base: "center", sm: "left" }}
                mt={{ base: 3, sm: 0 }}
              >
                <Heading
                  as="h2"
                  mb={4}
                  color={nicknameColor}
                  fontSize="2xl"
                  fontWeight={600}
                >
                  @{data.nickname || data.id}
                </Heading>

                <List spacing={1}>
                  {/* Current partner */}
                  {data.currentPartner && (
                    <ListItem>
                      <PersonalInfo
                        id={data.currentPartner}
                        label="Partner/ka"
                        color={nicknameColor}
                      />
                    </ListItem>
                  )}

                  {/* Ex partner */}
                  {data.exPartners && data.exPartners.length > 0 && (
                    <>
                      {data.exPartners.map((exPartner) => (
                        <ListItem key={exPartner}>
                          <PersonalInfo
                            id={exPartner}
                            label="Ex-partner/ka"
                            color={nicknameColor}
                          />
                        </ListItem>
                      ))}
                    </>
                  )}

                  {/* Siblings */}
                  {data.siblings && data.siblings.length > 0 && (
                    <>
                      {data.siblings.map((sibling) => (
                        <ListItem key={sibling}>
                          <PersonalInfo
                            id={sibling}
                            label="Sourozenec"
                            color={nicknameColor}
                          />
                        </ListItem>
                      ))}
                    </>
                  )}
                </List>

                <Flex
                  gap={1}
                  mt={5}
                  justify={{ base: "center", sm: "flex-start" }}
                >
                  {data.interest.map((interest) => (
                    <Interest key={interest}>{interest}</Interest>
                  ))}
                </Flex>
              </Box>
            </Flex>

            {/* Social networks */}
            <Flex
              gap={2}
              justify={{ base: "center", sm: "flex-start" }}
              mt={{ base: 6, md: 0 }}
            >
              {data.facebook && (
                <SocialButton
                  network="facebook"
                  icon={FaFacebook}
                  link={`https://www.facebook.com/${data.facebook}`}
                />
              )}
              {data.instagram && (
                <SocialButton
                  network="instagram"
                  icon={FaInstagram}
                  link={`https://www.instagram.com/${data.instagram}`}
                />
              )}
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      {/* Trips */}
      <Card mt={4}>
        <CardHeader>
          <Heading as="h2" fontSize="xl" display="flex" alignItems="center">
            Zájezdy
            <Count number={trips.length} />
          </Heading>
        </CardHeader>
        <Divider borderColor={dividerColor} />
        <CardBody>
          <Flex wrap="wrap" m={-2}>
            {trips.map(({ id, title, year, countryCode }) => (
              <Card
                key={id}
                m={2}
                width={{ base: "100%", sm: 56 }}
                bgColor={tripBgColor}
                _hover={{
                  cursor: "pointer",
                  boxShadow: "outline",
                }}
                onClick={() => handleTripClick(id)}
              >
                <CardBody py={4} display="flex" alignItems="center">
                  <FlagImage countryCode={countryCode} boxSize={28} mr={3} />
                  <Box>
                    <Text color="gray.500" fontSize="sm" lineHeight="none">
                      {year}
                    </Text>
                    <Text fontSize="md" fontWeight={600}>
                      {title}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </CardBody>
      </Card>

      {/* Resorts */}
      <Card mt={4}>
        <CardHeader>
          <Heading as="h2" fontSize="xl" display="flex" alignItems="center">
            Střediska
            <Count number={resorts.length} />
          </Heading>
        </CardHeader>
        <Divider borderColor={dividerColor} />
        <CardBody>
          <Flex wrap="wrap" m={-2}>
            {resorts.map(({ id, name }) => (
              <Tooltip key={id} label={name} shouldWrapChildren>
                <ResortImage
                  id={id}
                  name={name}
                  asAvatar
                  onClick={() => handleResortClick(id)}
                />
              </Tooltip>
            ))}
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

const Page = ({ params: { id } }: { params: { id: string[] } }) => {
  const member = MEMBERS.find((member) => member.id === id[0]);

  return (
    <>
      <Header name={member?.name} />
      <Member data={member} />
    </>
  );
};

export default Page;
