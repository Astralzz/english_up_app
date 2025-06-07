import React from 'react';
import { TFunction } from 'i18next';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Divider, IconButton } from 'react-native-paper';
import { Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ColorsAppType } from '@/theme/colors';
import { resolveImageForPathId } from '@/utils/iamgeUtils';

// path translation
const PATH_TRANSLATION = 'about';

// Props
interface AboutScreenProps {
  t: TFunction<'translation', undefined>;
  colors: ColorsAppType;
}

/**
 * About screen component
 *
 * @param {AboutScreenProps} props
 * @return {TSX.Component}
 */
const AboutScreen: React.FC<AboutScreenProps> = ({ t, colors }) => {
  // Get edain
  const getEdain = React.useMemo(() => {
    // Get image
    const imageId = t(`${PATH_TRANSLATION}.edain.image_id`);
    const edainAvatar = resolveImageForPathId(imageId);

    return {
      name: t(`${PATH_TRANSLATION}.edain.name`),
      avatar: edainAvatar,
      role: t(`${PATH_TRANSLATION}.edain.role`),
      description: t(`${PATH_TRANSLATION}.edain.description`),
      links: {
        github: t(`${PATH_TRANSLATION}.edain.links.github`),
        linkedin: t(`${PATH_TRANSLATION}.edain.links.linkedin`),
        portfolio: t(`${PATH_TRANSLATION}.edain.links.portfolio`),
        email: t(`${PATH_TRANSLATION}.edain.links.email`),
      },
    };
  }, [t]);

  // Get references
  const getReferences = React.useMemo(() => {
    return t(`${PATH_TRANSLATION}.references.items`, {
      returnObjects: true,
    }) as {
      title: string;
      description: string;
      url: string;
    }[];
  }, [t]);

  // Social icon
  const SocialIcon = React.useCallback(
    ({ icon, url }: { icon: string; url: string }) => (
      <IconButton
        icon={() => <Icon name={icon} size={32} color={colors.primary[600]} />}
        onPress={() => Linking.openURL(url)}
      />
    ),
    [colors]
  );

  // Styles
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.content}>
      {/* Profile */}
      <View style={styles.header}>
        {/* Avatar */}
        {getEdain?.avatar && (
          <Image
            source={getEdain.avatar}
            style={styles.avatar}
            resizeMode="cover"
          />
        )}

        <View>
          {/* Nombre */}
          <Text variant="titleLarge" style={styles.name}>
            {getEdain.name}
          </Text>

          {/* Rol */}
          <Text style={styles.role}>{getEdain.role}</Text>

          {/* Descripción */}
          <Text style={styles.description}>{getEdain.description}</Text>
        </View>

        {/* Redes sociales */}
        <View style={styles.socials}>
          <SocialIcon icon="github" url={getEdain?.links.github} />
          <SocialIcon icon="linkedin" url={getEdain?.links.linkedin} />
          <SocialIcon icon="web" url={getEdain?.links.portfolio} />
          <SocialIcon icon="email" url={`mailto:${getEdain?.links.email}`} />
        </View>
      </View>

      <Divider
        style={{
          backgroundColor: colors.primary[500],
          height: 1,
          marginBottom: 12,
        }}
      />

      {/* Referencias */}
      <View style={styles.referencesContainer}>
        <Text style={styles.referencesTitle}>
          {t(`${PATH_TRANSLATION}.references.title`)}
        </Text>

        {/* Divider */}
        <Divider
          style={{
            backgroundColor: colors.primary[400],
            height: 0.5,
            marginVertical: 10,
          }}
        />

        {/* Referencias */}
        {getReferences.map((ref, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(ref.url)}
          >
            <View style={styles.referenceItem}>
              {/* icon */}
              <Icon name="link" size={22} color={colors.primary[600]} />

              {/* description */}
              <View style={styles.referenceText}>
                <Text style={styles.referenceTitle}>{ref.title}</Text>
                <Text style={styles.referenceDescription}>
                  {ref.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Version */}
      <View style={styles.footer}>
        <Text style={styles.version}>{t(`${PATH_TRANSLATION}.version`)}</Text>
      </View>
    </View>
  );
};

/**
 * Get styles
 *
 * @param {ColorsAppType} colors
 * @return {StyleSheet}
 */
const getStyles = (colors: ColorsAppType) =>
  StyleSheet.create({
    // Container
    content: {
      flex: 1,
      height: '80%',
    },
    header: {
      marginTop: 15,
      alignItems: 'center',
    },

    // Profile
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginBottom: 15,
      borderWidth: 2,
      borderColor: colors.primary[300],
    },
    name: {
      color: colors.primary[600],
      fontSize: 27,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    role: {
      color: colors.text.primary,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    description: {
      color: colors.text.secondary,
      fontSize: 14,
      textAlign: 'justify',
      marginBottom: 10,
      paddingHorizontal: 8,
    },
    socials: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },

    // Footer
    footer: {
      alignItems: 'center',
      marginTop: 20,
    },
    version: {
      color: colors.text.secondary,
      fontSize: 12,
    },

    // References
    referencesContainer: {
      borderRadius: 12,
      padding: 20,
    },
    referencesTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 10,
    },
    referenceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      marginBottom: 15,
    },
    referenceText: {
      marginLeft: 10,
      flex: 1,
    },
    referenceTitle: {
      color: colors.primary[400],
      fontWeight: 'bold',
    },
    referenceDescription: {
      color: colors.text.secondary,
      textAlign: 'justify',
      fontSize: 13,
    },
  });

export default AboutScreen;
