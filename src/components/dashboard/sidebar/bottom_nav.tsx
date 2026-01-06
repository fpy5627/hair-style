"use client";

import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Nav } from "@/types/blocks/base";
import { SafeLink } from "@/components/common/safe-link";
import Icon from "@/components/icon";

export function BottomNav({
  nav,
  ...props
}: {
  nav: Nav;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {nav.items
            ?.filter((item) => item.url && item.url.trim() !== "")
            .map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <SafeLink href={item.url as any} target={item.target}>
                    {item.icon && <Icon name={item.icon} />}
                    <span>{item.title}</span>
                  </SafeLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
