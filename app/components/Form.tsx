"use client";

import {
  Box,
  Button,
  Paper,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { compute } from "../actions/compute";
import { Result } from "../types/result";
import { ResultComponent } from "./Result";

export const CalculatorForm = () => {
  const activities = [
    {
      value: "sedentary",
      label: "Sedentary",
      description: "Little or no exercise",
    },
    {
      value: "light",
      label: "Lightly active",
      description: "Light exercise/sports 1-3 days/week",
    },
    {
      value: "moderate",
      label: "Moderately active",
      description: "Moderate exercise/sports 3-5 days/week",
    },
    {
      value: "active",
      label: "Very active",
      description: "Hard exercise/sports 6-7 days a week",
    },
    {
      value: "super",
      label: "Super active",
      description: "Very hard exercise/sports & physical job",
    },
  ];

  const goals = [
    {
      value: "maintain",
      label: "Maintain current weight",
    },
    {
      value: "lose",
      label: "Lose weight",
    },
    {
      value: "gain",
      label: "Gain weight",
    },
  ];

  const form = useForm({
    initialValues: {
      age: 25,
      gender: "m",
      height: 150,
      weight: 80,
      goal: "lose",
      activity: "sedentary",
    },
  });

  const [result, setResult] = useState<Result | null>(null);

  const submit = async (form: FormData) => {
    setResult((await compute(form)) as Result);
  };

  return (
    <Box p="xl" maw="600" mx="auto">
      {result ? (
        <ResultComponent result={result} setResult={setResult} />
      ) : (
        <Paper p="sm">
          <form color="bright-orange" action={submit}>
            <Stack gap="30">
              <Title order={1} className="text-center">
                Macro Calculator
              </Title>
              <Stack gap="xs">
                <Text ml="md">I am</Text>
                <SegmentedControl
                  fullWidth
                  name="gender"
                  data={[
                    { label: "Male", value: "m" },
                    { label: "Female", value: "f" },
                  ]}
                  {...form.getInputProps("gender")}
                />
              </Stack>
              <Stack gap="xs">
                <Text ml="md">{form.values.age} years young</Text>
                <Slider
                  name="age"
                  min={15}
                  max={100}
                  marks={[{ value: 0 }, { value: 100 }]}
                  {...form.getInputProps("age")}
                />
              </Stack>
              <Stack gap="xs">
                <Text ml="md">
                  my height is
                  <strong> {form.values.height} CM</strong>
                </Text>
                <Slider
                  name="height"
                  min={100}
                  max={250}
                  marks={[{ value: 50 }, { value: 250 }]}
                  {...form.getInputProps("height")}
                />
              </Stack>
              <Stack gap="xs">
                <Text ml="md">
                  with current weight of
                  <strong> {form.values.weight} KG</strong>
                </Text>
                <Slider
                  name="weight"
                  min={40}
                  max={200}
                  marks={[{ value: 40 }, { value: 200 }]}
                  {...form.getInputProps("weight")}
                />
              </Stack>
              <Stack gap="xs">
                <Text ml="md">my goal is to</Text>
                <Select
                  name="goal"
                  data={goals}
                  {...form.getInputProps("goal")}
                  comboboxProps={{ position: "top" }}
                />
              </Stack>
              <Stack>
                <Text ml="md">my activity level is</Text>
                <Select
                  placeholder="Pick an activity level"
                  name="activity"
                  data={activities}
                  {...form.getInputProps("activity")}
                  comboboxProps={{ position: "top" }}
                />
                {form.values.activity && (
                  <Text ml="md">
                    {
                      activities.find((a) => a.value === form.values.activity)
                        ?.description
                    }
                  </Text>
                )}
              </Stack>
              <div>
                <Button fullWidth color="bright-orange" type="submit">
                  Calculate
                </Button>
              </div>
            </Stack>
          </form>
        </Paper>
      )}
    </Box>
  );
};
