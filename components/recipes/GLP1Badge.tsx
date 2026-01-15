import { StyleSheet, View, Text } from 'react-native';

import { StanfordColors } from '@/constants/theme';

interface GLP1BadgeProps {
  protein: number;
  isGlp1Friendly: boolean;
}

export function GLP1Badge({ protein, isGlp1Friendly }: GLP1BadgeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.proteinBadge}>
        <Text style={styles.proteinText}>{protein}g protein</Text>
      </View>
      {isGlp1Friendly && (
        <View style={styles.glp1Badge}>
          <Text style={styles.glp1Text}>GLP-1 Friendly</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  proteinBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  proteinText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  glp1Badge: {
    backgroundColor: StanfordColors.beige,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  glp1Text: {
    color: StanfordColors.cardinalDark,
    fontSize: 12,
    fontWeight: '600',
  },
});
