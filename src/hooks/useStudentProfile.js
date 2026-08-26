import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfileSection } from "../services/mockProfileService";
import { calculateProfileCompletion } from "../utils/calculateCompletion";

// Single hook used by StudentDashboard, StudentProfile, and EditProfile
// so all three always read/write the same profile data consistently.
export function useStudentProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await getProfile(user.id, { name: user.name, phone: user.phone });
    setProfile(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const saveSection = async (sectionKey, sectionData) => {
    const updated = await updateProfileSection(user.id, sectionKey, sectionData);
    setProfile(updated);
    return updated;
  };

  const completion = profile ? calculateProfileCompletion(profile) : 0;

  return { profile, loading, completion, saveSection, reloadProfile: loadProfile };
}