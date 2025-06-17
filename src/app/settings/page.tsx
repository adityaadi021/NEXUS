'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { User, Lock, Mail, Gamepad2, Hash, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    ign: '',
    inGameId: '',
    bio: '',
    currentPassword: '',
  });
  const [originalData, setOriginalData] = useState({
    username: '',
    email: '',
    ign: '',
    inGameId: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      const userData = {
        username: user.username || '',
        email: user.email || '',
        ign: user.ign || '',
        inGameId: user.inGameId || '',
        bio: user.bio || '',
      };
      setFormData(prev => ({
        ...prev,
        ...userData
      }));
      setOriginalData(userData);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const verifyPassword = async (password: string) => {
    try {
      const response = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Password verification failed');
      }

      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  };

  const handleVerifyPassword = async () => {
    if (!formData.currentPassword) {
      toast.error('Please enter your current password');
      return;
    }

    setIsVerifying(true);
    try {
      const isValid = await verifyPassword(formData.currentPassword);
      
      if (!isValid) {
        toast.error('Incorrect password');
        return;
      }

      // If password is correct, save the changes
      await handleSaveChanges();
      
      setShowPasswordModal(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
      }));
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify password');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          ign: formData.ign,
          inGameId: formData.inGameId,
          bio: formData.bio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Update original data after successful save
      setOriginalData({
        username: formData.username,
        email: formData.email,
        ign: formData.ign,
        inGameId: formData.inGameId,
        bio: formData.bio,
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update profile');
      
      // Revert to original data on error
      setFormData(prev => ({
        ...prev,
        ...originalData,
        currentPassword: '',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert to original data when canceling
    setFormData(prev => ({
      ...prev,
      ...originalData,
      currentPassword: '',
    }));
    setShowPasswordModal(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400">Update your profile information</p>
          </div>

          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription>
                Update your profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="pl-10 bg-[#23243a] border-[#2a2b45] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-[#23243a] border-[#2a2b45] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ign" className="text-white">In-Game Name</Label>
                  <div className="relative">
                    <Gamepad2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="ign"
                      name="ign"
                      value={formData.ign}
                      onChange={handleInputChange}
                      className="pl-10 bg-[#23243a] border-[#2a2b45] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inGameId" className="text-white">In-Game ID</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="inGameId"
                      name="inGameId"
                      value={formData.inGameId}
                      onChange={handleInputChange}
                      className="pl-10 bg-[#23243a] border-[#2a2b45] text-white"
                      placeholder="e.g., #1234"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-[#23243a] border-[#2a2b45] text-white"
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setShowPasswordModal(true)}
                  className="bg-[#a259ff] hover:bg-[#8e44ec] text-white"
                  disabled={isLoading}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="bg-[#181924] border-[#23243a] text-white">
          <DialogHeader>
            <DialogTitle>Verify Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please enter your current password to save changes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-password" className="text-white">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="modal-password"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pl-10 bg-[#23243a] border-[#2a2b45] text-white"
                  placeholder="Enter your current password"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleCancel}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyPassword}
                className="bg-[#a259ff] hover:bg-[#8e44ec] text-white"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify & Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
