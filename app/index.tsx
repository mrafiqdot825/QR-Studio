import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type QRCodeRef = {
  toDataURL: (callback: (dataURL: string) => void) => void;
};

const { width } = Dimensions.get("window");

export default function Index(): React.JSX.Element {
  const [url, setUrl] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const qrRef = useRef<QRCodeRef | null>(null);

  const handleGenerateQR = (): void => {
    if (!url.trim()) {
      Alert.alert("Error", "Please enter a URL");
      return;
    }
    Keyboard.dismiss();
    setShowQR(true);
  };

  const handleReset = (): void => {
    setUrl("");
    setShowQR(false);
  };

  const handleDownload = async (): Promise<void> => {
    try {
      if (!permissionResponse?.granted) {
        const permission = await requestPermission();
        if (!permission.granted) {
          Alert.alert("Error", "Permission to access media library was denied");
          return;
        }
      }

      if (!qrRef.current) {
        Alert.alert("Error", "QR Code reference not found");
        return;
      }

      qrRef.current.toDataURL(async (dataURL: string) => {
        try {
          const timestamp = new Date().getTime();
          const filepath = `${FileSystem.cacheDirectory}qr-code-${timestamp}.png`;

          let base64Code = dataURL;
          if (dataURL.includes("base64,")) {
            base64Code = dataURL.split("base64,")[1];
          }

          await FileSystem.writeAsStringAsync(filepath, base64Code, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const asset = await MediaLibrary.createAssetAsync(filepath);
          await MediaLibrary.createAlbumAsync("QR Codes", asset, false);

          Alert.alert("Success", "QR code saved to your photos!");

          // Clean up the temporary file
          await FileSystem.deleteAsync(filepath, { idempotent: true });
        } catch (error) {
          console.error("Download error:", error);
          Alert.alert("Error", "Failed to save QR code to photos");
        }
      });
    } catch (error) {
      console.error("Download preparation error:", error);
      Alert.alert("Error", "Failed to prepare QR code for download");
    }
  };

  const handleShare = async (): Promise<void> => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert("Error", "Sharing is not available on your platform");
        return;
      }

      if (!qrRef.current) {
        Alert.alert("Error", "QR Code reference not found");
        return;
      }

      // Get QR code as PNG base64
      qrRef.current.toDataURL(async (dataURL: string) => {
        try {
          // Create a temporary file path with timestamp to ensure uniqueness
          const timestamp = new Date().getTime();
          const filepath = `${FileSystem.cacheDirectory}qr-code-${timestamp}.png`;

          let base64Code = dataURL;
          // Check if the dataURL includes the data:image prefix and remove it if present
          if (dataURL.includes("base64,")) {
            base64Code = dataURL.split("base64,")[1];
          }

          // Write the file
          await FileSystem.writeAsStringAsync(filepath, base64Code, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Verify file exists before sharing
          const fileInfo = await FileSystem.getInfoAsync(filepath);
          if (!fileInfo.exists) {
            throw new Error("Generated file does not exist");
          }

          // Share the file
          await Sharing.shareAsync(filepath, {
            mimeType: "image/png",
            dialogTitle: "Share QR Code",
            UTI: "public.png",
          }).finally(async () => {
            // Clean up the temporary file
            try {
              await FileSystem.deleteAsync(filepath, { idempotent: true });
            } catch (cleanupError) {
              console.warn("Failed to cleanup temporary file:", cleanupError);
            }
          });
        } catch (error) {
          console.error("Sharing error:", error);
          Alert.alert("Error", "Failed to share QR code. Please try again.");
        }
      });
    } catch (error) {
      console.error("Share preparation error:", error);
      Alert.alert(
        "Error",
        "Failed to prepare QR code for sharing. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            entering={FadeIn.duration(800)}
            style={styles.headerContainer}
          >
            <LinearGradient
              colors={["#e8f0ff", "#dae7ff"]}
              style={styles.headerCard}
            >
              <BlurView
                intensity={20}
                tint="light"
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.headerContent}>
                <View style={styles.header}>
                  <View style={styles.logoContainer}>
                    <LinearGradient
                      colors={["#007AFF", "#1a8cff"]}
                      style={styles.iconWrapper}
                    >
                      <FontAwesome name="qrcode" size={24} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.title}>QRify</Text>
                  </View>
                </View>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>
                    Create, Share, Connect {"\n"}
                    <Text style={styles.subtitleHighlight}>Instantly!</Text>
                  </Text>
                  <Text style={styles.subtitleDescription}>
                    Transform any link into a sleek QR code in seconds.{"\n"}
                    Perfect for business cards, menus, and social sharing.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(800).delay(200)}
            style={styles.mainContent}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Enter your URL below</Text>
              <View style={styles.inputContainer}>
                <FontAwesome
                  name="link"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="https://example.com"
                  placeholderTextColor="#999"
                  value={url}
                  onChangeText={setUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                />
                {url.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleReset}
                  >
                    <FontAwesome name="times-circle" size={20} color="#666" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, !url.trim() && styles.buttonDisabled]}
              onPress={handleGenerateQR}
              disabled={!url.trim()}
            >
              <FontAwesome
                name="magic"
                size={20}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>

            {showQR && url.trim() && (
              <Animated.View
                entering={FadeInDown.duration(600)}
                style={styles.qrContainer}
              >
                <LinearGradient
                  colors={["#ffffff", "#f0f2f5"]}
                  style={styles.qrWrapper}
                >
                  <QRCode
                    value={url}
                    size={width * 0.6}
                    backgroundColor="#fff"
                    color="#000"
                    getRef={(ref) => (qrRef.current = ref)}
                  />
                  <Text style={styles.urlText} numberOfLines={1}>
                    {url}
                  </Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.downloadButton]}
                      onPress={handleDownload}
                    >
                      <FontAwesome name="download" size={18} color="#fff" />
                      <Text style={styles.actionButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.shareButton]}
                      onPress={handleShare}
                    >
                      <FontAwesome name="share-alt" size={18} color="#fff" />
                      <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </Animated.View>
            )}
          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Add padding at the bottom for better scrolling
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  headerContent: {
    padding: 24,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  subtitleContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  subtitleHighlight: {
    color: "#007AFF",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitleDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#b3b3b3",
    shadowColor: "#666",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  qrContainer: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  qrWrapper: {
    padding: 30,
    alignItems: "center",
  },
  urlText: {
    marginTop: 20,
    color: "#666",
    fontSize: 14,
    maxWidth: width * 0.7,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  downloadButton: {
    backgroundColor: "#34C759",
  },
  shareButton: {
    backgroundColor: "#007AFF",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
