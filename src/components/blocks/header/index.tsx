"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Header as HeaderType } from "@/types/blocks/header";
import Icon from "@/components/icon";
import { SafeLink } from "@/components/common/safe-link";
import LocaleToggle from "@/components/locale/toggle";
import { Menu } from "lucide-react";
import SignToggle from "@/components/sign/toggle";
import ThemeToggle from "@/components/theme/toggle";
import { cn } from "@/lib/utils";

export default function Header({ header }: { header: HeaderType }) {
  if (header.disabled) {
    return null;
  }

  return (
    <section className="py-3">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <SafeLink
              href={(header.brand?.url as any) || ""}
              className="flex items-center gap-2"
            >
              {header.brand?.logo?.src && (
                <img
                  src={header.brand.logo.src}
                  alt={header.brand.logo.alt || header.brand.title}
                  className="w-8"
                />
              )}
              {header.brand?.title && (
                <span className="text-xl text-primary font-bold">
                  {header.brand?.title || ""}
                </span>
              )}
            </SafeLink>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {header.nav?.items
                    ?.filter((item) => item.url && item.url.trim() !== "")
                    .map((item, i) => {
                      if (item.children && item.children.length > 0) {
                        const validChildren = item.children.filter(
                          (child) => child.url && child.url.trim() !== ""
                        );
                        if (validChildren.length === 0) return null;

                        return (
                          <NavigationMenuItem
                            key={i}
                            className="text-muted-foreground"
                          >
                            <NavigationMenuTrigger>
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="size-4 shrink-0 mr-2"
                                />
                              )}
                              <span>{item.title}</span>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="w-80 p-3">
                                <NavigationMenuLink>
                                  {validChildren.map((iitem, ii) => (
                                    <li key={ii}>
                                      <SafeLink
                                        className={cn(
                                          "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        )}
                                        href={iitem.url as any}
                                        target={iitem.target}
                                      >
                                        {iitem.icon && (
                                          <Icon
                                            name={iitem.icon}
                                            className="size-5 shrink-0"
                                          />
                                        )}
                                        <div>
                                          <div className="text-sm font-semibold">
                                            {iitem.title}
                                          </div>
                                          <p className="text-sm leading-snug text-muted-foreground">
                                            {iitem.description}
                                          </p>
                                        </div>
                                      </SafeLink>
                                    </li>
                                  ))}
                                </NavigationMenuLink>
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        );
                      }

                    return (
                      <NavigationMenuItem key={i}>
                        <SafeLink
                          className={cn(
                            "text-muted-foreground",
                            navigationMenuTriggerStyle,
                            buttonVariants({
                              variant: "ghost",
                            })
                          )}
                          href={item.url as any}
                          target={item.target}
                        >
                          {item.icon && (
                            <Icon
                              name={item.icon}
                              className="size-4 shrink-0 mr-0"
                            />
                          )}
                          {item.title}
                        </SafeLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="shrink-0 flex gap-2 items-center">
            {header.show_locale && <LocaleToggle />}
            {header.show_theme && <ThemeToggle />}

            {header.buttons
              ?.filter((item) => item.url && item.url.trim() !== "")
              .map((item, i) => {
                return (
                  <Button key={i} variant={item.variant}>
                    <SafeLink
                      href={item.url as any}
                      target={item.target || ""}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      {item.title}
                      {item.icon && (
                        <Icon name={item.icon} className="size-4 shrink-0" />
                      )}
                    </SafeLink>
                  </Button>
                );
              })}
            {header.show_sign && <SignToggle />}
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <SafeLink
              href={(header.brand?.url || "") as any}
              className="flex items-center gap-2"
            >
              {header.brand?.logo?.src && (
                <img
                  src={header.brand.logo.src}
                  alt={header.brand.logo.alt || header.brand.title}
                  className="w-8"
                />
              )}
              {header.brand?.title && (
                <span className="text-xl font-bold">
                  {header.brand?.title || ""}
                </span>
              )}
            </SafeLink>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <SafeLink
                      href={(header.brand?.url || "") as any}
                      className="flex items-center gap-2"
                    >
                      {header.brand?.logo?.src && (
                        <img
                          src={header.brand.logo.src}
                          alt={header.brand.logo.alt || header.brand.title}
                          className="w-8"
                        />
                      )}
                      {header.brand?.title && (
                        <span className="text-xl font-bold">
                          {header.brand?.title || ""}
                        </span>
                      )}
                    </SafeLink>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-8 mt-8 flex flex-col gap-4">
                  <Accordion type="single" collapsible className="w-full">
                    {header.nav?.items
                      ?.filter((item) => item.url && item.url.trim() !== "")
                      .map((item, i) => {
                        if (item.children && item.children.length > 0) {
                          const validChildren = item.children.filter(
                            (child) => child.url && child.url.trim() !== ""
                          );
                          if (validChildren.length === 0) return null;

                          return (
                            <AccordionItem
                              key={i}
                              value={item.title || ""}
                              className="border-b-0"
                            >
                              <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline text-left">
                                {item.title}
                              </AccordionTrigger>
                              <AccordionContent className="mt-2">
                                {validChildren.map((iitem, ii) => (
                                  <SafeLink
                                    key={ii}
                                    className={cn(
                                      "flex select-none gap-4 rounded-md p-3 leading-none outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    )}
                                    href={iitem.url as any}
                                    target={iitem.target}
                                  >
                                    {iitem.icon && (
                                      <Icon
                                        name={iitem.icon}
                                        className="size-4 shrink-0"
                                      />
                                    )}
                                    <div>
                                      <div className="text-sm font-semibold">
                                        {iitem.title}
                                      </div>
                                      <p className="text-sm leading-snug text-muted-foreground">
                                        {iitem.description}
                                      </p>
                                    </div>
                                  </SafeLink>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          );
                        }
                        return (
                          <SafeLink
                            key={i}
                            href={item.url as any}
                            target={item.target}
                            className="font-semibold my-4 flex items-center gap-2 px-4"
                          >
                            {item.icon && (
                              <Icon
                                name={item.icon}
                                className="size-4 shrink-0"
                              />
                            )}
                            {item.title}
                          </SafeLink>
                        );
                      })}
                  </Accordion>
                </div>
                <div className="flex-1"></div>
                <div className="border-t pt-4">
                  <div className="mt-2 flex flex-col gap-3">
                    {header.buttons
                      ?.filter((item) => item.url && item.url.trim() !== "")
                      .map((item, i) => {
                        return (
                          <Button key={i} variant={item.variant}>
                            <SafeLink
                              href={item.url as any}
                              target={item.target || ""}
                              className="flex items-center gap-1"
                            >
                              {item.title}
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="size-4 shrink-0"
                                />
                              )}
                            </SafeLink>
                          </Button>
                        );
                      })}

                    {header.show_sign && <SignToggle />}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {header.show_locale && <LocaleToggle />}
                    <div className="flex-1"></div>

                    {header.show_theme && <ThemeToggle />}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
