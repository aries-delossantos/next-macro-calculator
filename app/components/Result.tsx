import { Result } from "@/app/types/result";
import { PieChart } from "@mantine/charts";
import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type props = {
  result: Result;
  setResult: Dispatch<SetStateAction<Result | null>>;
};

export const ResultComponent = ({ result, setResult }: props) => {
  return (
    <Paper>
      <Stack gap="sm">
        <Title order={1} className="text-center">
          Your Daily Macro Goals
        </Title>
        <Group align="center" justify="center" my="lg">
          <Stack gap="0" align="center">
            <Text size="2em" c="bright-orange" fw="bolder">
              {Math.ceil(result.goal.calories)}
            </Text>
            <Badge mt="0">total calories</Badge>
          </Stack>
          <Stack gap="0" align="center">
            <Text size="2em" c="bright-orange" fw="bolder">
              {Math.floor(result.tdee - result.goal.calories)}
            </Text>
            <Badge mt="0">Caloric Defecit</Badge>
          </Stack>
        </Group>
        <Group grow justify="space-between" align="center" gap="lg">
          <Stack gap="0" align="center" className="text-center">
            <Text size="xl" fw="bold" c="indigo.6">
              {result.allocation.protein}g
            </Text>
            <Badge fullWidth bg="indigo.6">
              Protein
            </Badge>
          </Stack>
          <Stack gap="0" align="center">
            <Text size="xl" fw="bold" c="grape.6">
              {result.allocation.carb}g
            </Text>
            <Badge fullWidth bg="grape.6">
              Carbs
            </Badge>
          </Stack>
          <Stack gap="0" align="center">
            <Text size="xl" fw="bold" c="teal.6">
              {result.allocation.fat}g
            </Text>
            <Badge fullWidth bg="teal.6">
              Fat
            </Badge>
          </Stack>
        </Group>
        <div className="flex flex-col md:flex-row mt-10 gap-5">
          <Stack>
            <Title order={4}>Our Formula For You</Title>
            <Text size="md">
              If you are counting macros for bodybuilding and muscle, you will
              want to add overall calories to put on weight. Try this range of
              macro ratio.
            </Text>
          </Stack>
          <Container>
            <PieChart
              withLabelsLine
              labelsPosition="inside"
              labelsType="percent"
              withLabels
              withTooltip
              data={[
                {
                  name: "Protein",
                  value: result.goal.macro.protein,
                  color: "indigo.6",
                },
                {
                  name: "Carbs",
                  value: result.goal.macro.carb,
                  color: "grape.6",
                },
                { name: "Fat", value: result.goal.macro.fat, color: "teal.6" },
              ]}
            />
          </Container>
        </div>
        <Button mt="lg" color="bright-orange" onClick={() => setResult(null)}>
          Reset
        </Button>
      </Stack>
    </Paper>
  );
};
