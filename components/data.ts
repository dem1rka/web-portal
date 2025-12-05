import { reactive } from "vue";
import axios from 'axios'

// Интерфейс для совместимости
export interface ILakeData {
  id: number
  name: string
  lat: number
  lng: number
  status: 'lake' | 'river'
  temperature: number | null
  humidity: number | null
  windSpeed: number | null
  pollutionLevel: number
  waterLevel: number
  coliform: number
  enterococci: number
  giardia: number
  lastUpdated: Date
}

export class LakeData implements ILakeData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: 'lake' | 'river';
  E: number; // Для обратной совместимости
  coliform: number;
  enterococci: number;
  giardia: number;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  waterLevel: number; // Переименовано с waterlevel для совместимости с интерфейсом
  lastUpdated: Date;
  pollutionLevel: number; // Добавлено для совместимости с интерфейсом

  constructor(
    name: string = '', 
    lat: number = 0, 
    lng: number = 0, 
    id: number = 0, 
    status: 'lake' | 'river' = 'lake'
  ) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.id = id;
    this.status = status;
    this.E = LakeData.randomPatogen(10, 15);
    this.coliform = LakeData.randomPatogen(20, 30);
    this.enterococci = LakeData.randomPatogen(5, 10);
    this.giardia = LakeData.randomPatogen(5, 10);
    this.temperature = null;
    this.humidity = null;
    this.windSpeed = null;
    this.waterLevel = LakeData.randomPatogen(0.5, 2.0);
    this.lastUpdated = new Date();
    this.pollutionLevel = this.calculatePollutionLevel();
  }

  // Рассчитываем уровень загрязнения на основе патогенов
  private calculatePollutionLevel(): number {
    // Комбинированная оценка загрязнения на основе всех патогенов
    const weightedScore = 
      (this.coliform * 0.4) + 
      (this.enterococci * 0.3) + 
      (this.giardia * 0.3);
    
    // Нормализуем к шкале 0-100
    return Math.min(100, Math.max(0, (weightedScore / 30) * 100));
  }

  async setAxios(): Promise<void> {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      const data = response.data.current;
      this.temperature = data.temperature_2m;
      this.humidity = data.relative_humidity_2m;
      this.windSpeed = data.wind_speed_10m;
      this.lastUpdated = new Date();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Устанавливаем случайные значения для демонстрации в случае ошибки
      this.temperature = LakeData.randomPatogen(5, 25);
      this.humidity = LakeData.randomPatogen(50, 90);
      this.windSpeed = LakeData.randomPatogen(5, 25);
      this.lastUpdated = new Date();
    }
  }

  static randomPatogen = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  }

  // Метод для обновления данных (для совместимости с вашим setAxios)
  static async updateAllLakes(): Promise<void> {
    const promises = lakes.map(lake => lake.setAxios());
    await Promise.all(promises);
  }

  // Геттер для обратной совместимости с вашим E свойством
  get pollutionRisk(): string {
    if (this.pollutionLevel < 30) return 'low';
    if (this.pollutionLevel < 50) return 'medium';
    return 'high';
  }
}

// Основной массив данных, совместимый с обоими форматами
export const lakes = reactive<LakeData[]>([
  new LakeData('Озеро Пестрое', 54.836699, 69.111328, 1, 'lake'),
  new LakeData('Озеро Белое', 54.927154, 69.254322, 2, 'lake'),
  new LakeData('Озеро Горькое', 54.947573, 68.951122, 3, 'lake'),
  new LakeData('Озеро Поганка', 54.921209, 69.053476, 4, 'lake'),
  new LakeData('Озеро Дикое', 54.840156, 69.131957, 5, 'lake'),
  new LakeData('Ishim', 54.893110, 69.127836, 6, 'river')
]);

// Статические данные для быстрого доступа (совместимость с первым форматом)
export const staticLakesData: ILakeData[] = [
  {
    id: 1,
    name: "Озеро Пестрое",
    lat: 54.836699,
    lng: 69.111328,
    status: "lake",
    temperature: 15.5,
    humidity: 65,
    windSpeed: 12,
    pollutionLevel: 25,
    waterLevel: 1.2,
    coliform: 25.3,
    enterococci: 7.2,
    giardia: 8.1,
    lastUpdated: new Date()
  },
  {
    id: 2,
    name: "Озеро Белое",
    lat: 54.927154,
    lng: 69.254322,
    status: "lake",
    temperature: 18.2,
    humidity: 70,
    windSpeed: 15,
    pollutionLevel: 45,
    waterLevel: 1.8,
    coliform: 28.1,
    enterococci: 6.8,
    giardia: 7.4,
    lastUpdated: new Date()
  },
  {
    id: 3,
    name: "Озеро Горькое",
    lat: 54.947573,
    lng: 68.951122,
    status: "lake",
    temperature: 16.8,
    humidity: 68,
    windSpeed: 10,
    pollutionLevel: 30,
    waterLevel: 1.5,
    coliform: 22.7,
    enterococci: 6.1,
    giardia: 7.8,
    lastUpdated: new Date()
  },
  {
    id: 4,
    name: "Озеро Поганка",
    lat: 54.921209,
    lng: 69.053476,
    status: "lake",
    temperature: 14.9,
    humidity: 72,
    windSpeed: 8,
    pollutionLevel: 35,
    waterLevel: 0.9,
    coliform: 24.9,
    enterococci: 7.9,
    giardia: 8.3,
    lastUpdated: new Date()
  },
  {
    id: 5,
    name: "Озеро Дикое",
    lat: 54.840156,
    lng: 69.131957,
    status: "lake",
    temperature: 17.3,
    humidity: 63,
    windSpeed: 18,
    pollutionLevel: 28,
    waterLevel: 1.6,
    coliform: 23.5,
    enterococci: 6.5,
    giardia: 7.6,
    lastUpdated: new Date()
  },
  {
    id: 6,
    name: "Ishim River",
    lat: 54.893110,
    lng: 69.127836,
    status: "river",
    temperature: 12.7,
    humidity: 75,
    windSpeed: 20,
    pollutionLevel: 65,
    waterLevel: 0.8,
    coliform: 32.2,
    enterococci: 9.3,
    giardia: 8.9,
    lastUpdated: new Date()
  }
];

// Функция для совместимости с вашим старым кодом
export async function setAxios() {
  return LakeData.updateAllLakes();
}

// Хелперы для работы с данными
export function getLakeById(id: number): LakeData | undefined {
  return lakes.find(lake => lake.id === id);
}

export function getLakesByStatus(status: 'lake' | 'river'): LakeData[] {
  return lakes.filter(lake => lake.status === status);
}

export function getAverageTemperature(): number | null {
  const validTemps = lakes.filter(l => l.temperature !== null).map(l => l.temperature as number);
  if (validTemps.length === 0) return null;
  return validTemps.reduce((a, b) => a + b, 0) / validTemps.length;
}

export function getAveragePollutionLevel(): number {
  return lakes.reduce((sum, lake) => sum + lake.pollutionLevel, 0) / lakes.length;
}

// Экспортируем все типы для удобства
export type { LakeData };