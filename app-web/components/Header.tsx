'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Bell, Home, Search, Settings, User, Camera, Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const handleMobileSearchClose = () => {
    setIsMobileSearchOpen(false);
  };

  // フォーカス管理とESCキーハンドリング
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileSearchOpen(false);
      }
    };

    if (isMobileSearchOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isMobileSearchOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">Wyly</h1>
          </div>

          {/* 検索バー */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="野生動物を検索..." className="pl-9" />
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex items-center space-x-2">
            {/* モバイル検索ボタン */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleMobileSearchToggle}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">検索</span>
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Home className="h-5 w-5" />
              <span className="sr-only">ホーム</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">通知</span>
            </Button>

            {/* ユーザーメニュー */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                      alt="ユーザー"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">ユーザーメニュー</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  プロフィール
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  設定
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* モバイルメニュー */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">メニュー</span>
            </Button>
          </div>
        </div>

        {/* モバイル検索バー */}
        {isMobileSearchOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={mobileSearchRef}
                    type="search"
                    placeholder="野生動物を検索..."
                    className="pl-9"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={handleMobileSearchClose}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">検索を閉じる</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
