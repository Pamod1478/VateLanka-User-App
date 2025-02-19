import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../utils/Constants";
import CustomText from "../utils/CustomText";

// Empty State Component
const EmptyState = ({ type }) => (
  <View style={styles.emptyStateContainer}>
    <MaterialIcons
      name={type === "draft" ? "edit-note" : "description"}
      size={48}
      color={COLORS.textGray}
    />
    <CustomText style={styles.emptyStateTitle}>
      {type === "draft" ? "No Draft Issues" : "No Submitted Issues"}
    </CustomText>
    <CustomText style={styles.emptyStateText}>
      {type === "draft"
        ? "Save your issues as drafts to edit them later"
        : "Your submitted issues will appear here"}
    </CustomText>
  </View>
);

// Issue Creation Modal Component
const CreateIssueModal = ({ visible, onClose, onSubmit }) => {
  const [issueText, setIssueText] = useState("");

  const handleSubmit = () => {
    if (issueText.trim()) {
      onSubmit({ text: issueText, isDraft: false }); // Fixed to pass proper object structure
      setIssueText("");
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <CustomText style={styles.modalTitle}>
                  Create New Issue
                </CustomText>
                <TouchableOpacity onPress={onClose}>
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={COLORS.textGray}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder="Describe the issue..."
                value={issueText}
                onChangeText={setIssueText}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={() => {
                    if (issueText.trim()) {
                      onSubmit({ text: issueText, isDraft: true });
                      setIssueText("");
                      onClose();
                    }
                  }}
                >
                  <MaterialIcons name="save" size={20} color={COLORS.white} />
                  <CustomText style={styles.buttonText}>Save Draft</CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSubmit}
                >
                  <MaterialIcons name="send" size={20} color={COLORS.white} />
                  <CustomText style={styles.buttonText}>Submit</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export function ReportScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [submitted, setSubmitted] = useState([]);

  const handleCreateIssue = (issueData) => {
    const newIssue = {
      id: Date.now(),
      title: issueData.text,
      time: "Just now",
      status: issueData.isDraft ? "draft" : "pending", // Added status
    };

    if (issueData.isDraft) {
      setDrafts((prevDrafts) => [newIssue, ...prevDrafts]);
    } else {
      setSubmitted((prevSubmitted) => [newIssue, ...prevSubmitted]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <CustomText style={styles.heading}>Reported Issues</CustomText>

        {/* Create New Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <CustomText style={styles.createButtonText}>
            + Create New Issue
          </CustomText>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Drafts Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CustomText style={styles.sectionTitle}>Drafts</CustomText>
              {drafts.length > 0 && (
                <CustomText style={styles.countBadge}>
                  {drafts.length}
                </CustomText>
              )}
            </View>
            {drafts.length === 0 ? (
              <EmptyState type="draft" />
            ) : (
              drafts.map((draft) => (
                <TouchableOpacity key={draft.id} style={styles.card}>
                  <MaterialIcons
                    name="description"
                    size={24}
                    color={COLORS.primary}
                  />
                  <View style={styles.cardContent}>
                    <CustomText style={styles.cardTitle}>
                      {draft.title}
                    </CustomText>
                    <CustomText style={styles.cardTime}>
                      Draft • {draft.time}
                    </CustomText>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={COLORS.textGray}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Submitted Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CustomText style={styles.sectionTitle}>Submitted</CustomText>
              {submitted.length > 0 && (
                <CustomText style={styles.countBadge}>
                  {submitted.length}
                </CustomText>
              )}
            </View>
            {submitted.length === 0 ? (
              <EmptyState type="submitted" />
            ) : (
              submitted.map((item) => (
                <TouchableOpacity key={item.id} style={styles.card}>
                  <MaterialIcons
                    name="description"
                    size={24}
                    color={COLORS.primary}
                  />
                  <View style={styles.cardContent}>
                    <CustomText style={styles.cardTitle}>
                      {item.title}
                    </CustomText>
                    <View style={styles.statusContainer}>
                      <CustomText style={styles.cardTime}>
                        {item.time}
                      </CustomText>
                      <View
                        style={[
                          styles.statusDot,
                          {
                            backgroundColor:
                              item.status === "pending"
                                ? COLORS.error
                                : COLORS.primary,
                          },
                        ]}
                      />
                      <CustomText
                        style={[styles.statusText, { color: COLORS.textGray }]}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </CustomText>
                    </View>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={COLORS.textGray}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>

        <CreateIssueModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleCreateIssue}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 35,
    paddingLeft: 16,
    paddingRight: 16,
  },
  scrollContent: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  countBadge: {
    fontSize: 14,
    color: COLORS.textGray,
    marginLeft: 8,
    backgroundColor: COLORS.backgroundGray,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    marginBottom: 8,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textGray,
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.textGray,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  cardTime: {
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
  },
  input: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  saveButton: {
    backgroundColor: COLORS.textGray,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default ReportScreen;
