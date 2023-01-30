import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";

interface Params {
  date: string;
}

interface DayInfoProps {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);

  const route = useRoute();
  const {date} = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const fetchHabits = async () => {
    try {
      setLoading(true);

      const response = await api.get('/day', {params: {
        date: date
      }});
      setDayInfo(response.data);
      
    } catch (error) {
      console.log(error);
      Alert.alert('Ops!', 'Não foi possível carregar as informações dos hábitos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, [])

  if(loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={55}/>

        <View className="mt-6">
          <CheckBox
            title="Beber 2L de água"
            checked={false}
          />
          <CheckBox 
            title="Caminhar"
            checked={true}
          />
        </View>
      </ScrollView>


    </View>
  );
}