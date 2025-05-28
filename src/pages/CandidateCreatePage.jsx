import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useToast,
  Center
} from "@chakra-ui/react";
import { createCandidate } from "../api/candidateService";
import { HiUserAdd } from "react-icons/hi";
import useTitle from "../hooks/useTitle";

// You can create a simplified icon for the upload section
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" fill="currentColor" />
  </svg>
);

const CandidateCreate = () => {
  useTitle("TechSpective | Add Candidate");

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const createCandidateMutation = useMutation({
    mutationFn: async (candidateData) => {
      const { firstName, lastName, language, cv } = candidateData;
      const base64EncodedCV = await convertToBase64(cv[0]);
      return createCandidate(firstName, lastName, language, base64EncodedCV);
    },
    onSuccess: () => {
      toast({
        title: "Candidate added",
        description: "New candidate has been successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/candidates");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create candidate. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const onSubmit = (data) => {
    if (!data.cv || data.cv.length === 0) {
      setFileError("CV is required");
      return;
    }

    const fileType = data.cv[0].type;
    if (fileType !== "application/pdf") {
      setFileError("Only PDF files are allowed");
      return;
    }

    createCandidateMutation.mutate(data);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileError("");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6}>Add New Candidate</Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} bg="white" p={6} borderRadius="md" shadow="md">
        <VStack spacing={6} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <FormControl isInvalid={!!errors.language}>
            <FormLabel htmlFor="language">Language</FormLabel>
            <Select
              id="language"
              placeholder="Select a language"
              {...register("language", { required: "Language is required" })}
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </Select>
            <FormErrorMessage>
              {errors.language && errors.language.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={fileError !== ""}>
            <FormLabel htmlFor="cv">CV (PDF only)</FormLabel>
            <Box
              borderWidth={2}
              borderRadius="md"
              borderStyle="dashed"
              borderColor={fileError ? "red.300" : "gray.200"}
              py={10}
              px={4}
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
              position="relative"
            >
              <Input
                id="cv"
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept=".pdf"
                {...register("cv", { required: true })}
                onChange={handleFileChange}
              />
              <Center flexDirection="column">
                <Box as={UploadIcon} boxSize={10} color="gray.400" mb={3} />
                <Text mb={1} fontWeight="medium">
                  Click to upload or drag and drop
                </Text>
                <Text fontSize="sm" color="gray.500">
                  PDF files only
                </Text>
                {file && (
                  <Text color="green.500" mt={2}>
                    Selected: {file.name}
                  </Text>
                )}
              </Center>
            </Box>
            {fileError && (
              <Text color="red.500" mt={2} fontSize="sm">
                {fileError}
              </Text>
            )}
          </FormControl>

          <Button
            mt={4}
            colorScheme="blue"
            isLoading={createCandidateMutation.isPending}
            type="submit"
            size="lg"
            className="flex items-center gap-4"
          >
            <HiUserAdd />
            Submit Candidate
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CandidateCreate;