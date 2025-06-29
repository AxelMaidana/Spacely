import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";

export const CartIcon = ({ onPress }: { onPress?: () => void }) => {
  const { totalCount } = useCart();

  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 15 }}>
      <View>
        <Ionicons name="cart-outline" size={28} color="#000" />
        {totalCount > 0 && (
          <View
            style={{
              position: "absolute",
              right: -6,
              top: -4,
              backgroundColor: "red",
              borderRadius: 8,
              paddingHorizontal: 5,
              paddingVertical: 1,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>{totalCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
