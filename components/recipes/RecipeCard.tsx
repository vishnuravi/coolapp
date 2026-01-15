import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { GLP1Badge } from './GLP1Badge';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Recipe } from '@/lib/recipes/types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor, borderColor },
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(recipe)}
    >
      <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.title}>
          {recipe.title}
        </ThemedText>
        <ThemedText numberOfLines={2} style={styles.description}>
          {recipe.description}
        </ThemedText>
        <View style={styles.meta}>
          <ThemedText style={styles.metaText}>
            {totalTime} min · {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
          </ThemedText>
        </View>
        <GLP1Badge protein={recipe.nutrition.protein} isGlp1Friendly={recipe.isGlp1Friendly} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  meta: {
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.6,
  },
});
