import React from 'react';
import {StyleSheet} from 'react-native';

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader
} from './ui/alert-dialog';
import { Text } from './ui/text';
import Icon, { IconType } from './Icon';
import { HStack } from './ui/hstack';
import { Button, ButtonText } from './ui/button';

export interface AlertButtonProps {
  title: string;
  onPress: () => void;
}

export interface IconProps {
  name: string;
  type: IconType;
  color: string;
}

export interface CustomAlertProps {
  title: string;
  icon?: IconProps;
  message: string;
  isVisible: boolean;
  cancelButton?: AlertButtonProps;
  confirmButton: AlertButtonProps;
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191919'
  },
  messageText: {
    fontSize: 14,
    color: '#191919',
  },
  cancelButton: {
    borderRadius: 22,
    color: '#0F0F0F',    
  },
  confirmButton: {
    borderRadius: 22,
    color: '#F0F0F0',
    backgroundColor: '#3070F0',
  },
  hMargin: {
    marginRight: 8,
  }
});

const CustomAlert = ({ title, icon, message, isVisible, cancelButton, confirmButton }: CustomAlertProps) => {
  return (
    <AlertDialog
      isOpen={isVisible}
      onClose={confirmButton.onPress}
      size="md" 
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <HStack>
            {icon && 
              (           
                <>
                  <Icon
                    name={icon.name}
                    type={icon.type}
                    color={icon.color}
                    size={20}
                  />
                  <HStack style={styles.hMargin}/>
                </>   
              )
            }
            <Text style={styles.titleText}>{title}</Text>
          </HStack>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm" style={styles.messageText}>
            {message}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          {cancelButton && 
            (
              <Button
                action="secondary"
                variant='outline'
                onPress={cancelButton.onPress}
                size="sm"
                style={styles.cancelButton}
              >
                <ButtonText>{cancelButton.title}</ButtonText>
              </Button>
            )
          }          
          <Button size="sm" onPress={confirmButton.onPress} style={styles.confirmButton}>
            <ButtonText>{confirmButton.title}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>      
  );
};

export default CustomAlert;